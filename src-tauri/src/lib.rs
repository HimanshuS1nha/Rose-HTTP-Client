use std::time::Instant;

use reqwest::Client;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
enum HttpError {
    RequestError(String, String),
    InvalidHeadersError,
}

#[derive(Serialize, Deserialize)]
struct Response {
    body: String,
    status: String,
    time: u128,
}

#[tauri::command]
async fn make_request(
    method: &str,
    url: &str,
    headers: Vec<String>,
) -> Result<Response, HttpError> {
    let client = Client::new();

    let mut request_builder = if method == "get" {
        client.get(url)
    } else if method == "post" {
        client.post(url)
    } else if method == "patch" {
        client.patch(url)
    } else if method == "put" {
        client.put(url)
    } else {
        client.delete(url)
    };

    for header in headers {
        let header_tuple = header.split_once(":");

        if let Some(header_tuple) = header_tuple {
            request_builder = request_builder.header(header_tuple.0, header_tuple.1);
        } else {
            return Err(HttpError::InvalidHeadersError);
        }
    }

    let start_time = Instant::now();

    let response = request_builder.send().await.map_err(|e| {
        HttpError::RequestError(
            e.status().unwrap().to_string(),
            "Error in making the request".to_string(),
        )
    })?;

    let response_status = response.status().to_string();
    
    let bytes = response.bytes().await.map_err(|e| {
        HttpError::RequestError(
            e.status().unwrap().to_string(),
            "Error in making the request".to_string(),
        )
    })?;
    let body = String::from_utf8_lossy(&bytes).to_string();

    let duration = start_time.elapsed().as_millis();


    Ok(Response {
        body,
        time: duration,
        status: response_status,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![make_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
