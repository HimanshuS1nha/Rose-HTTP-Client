use std::collections::HashMap;
use std::time::Instant;

use reqwest::Client;
use serde::{Deserialize, Serialize};
use serde_json::Value;

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
    size: f64,
    headers: HashMap<String, String>,
    is_response_json_type: bool,
}

#[tauri::command]
async fn make_request(
    method: &str,
    url: &str,
    headers: Vec<String>,
    form: HashMap<String, String>,
    json: Option<Value>,
    text: Option<String>,
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

    if let Some(json) = json {
        request_builder = request_builder.json(&json);
    }

    if let Some(text) = text {
        request_builder = request_builder.body(text);
    }

    if form.len() > 0 {
        request_builder = request_builder.form(&form);
    }

    let start_time = Instant::now();

    let response = request_builder.send().await.map_err(|e| {
        HttpError::RequestError(
            match e.status() {
                Some(status) => status.to_string(),
                None => "404 NOT FOUND".to_string(),
            },
            "Error in making the request".to_string(),
        )
    })?;

    let mut is_response_json_type = false;

    let mut response_headers: HashMap<String, String> = HashMap::new();

    for header in response.headers() {
        let key = header.0.to_string();
        let value = header.1.to_str().unwrap_or_default().to_string();

        if key.to_lowercase() == "content-type" {
            if value.to_lowercase().contains("application/json") {
                is_response_json_type = true;
            }
        }

        response_headers.insert(key, value);
    }

    let response_status = response.status().to_string();

    let bytes = response.bytes().await.map_err(|e| {
        HttpError::RequestError(
            e.status().unwrap().to_string(),
            "Error in making the request".to_string(),
        )
    })?;
    let body = String::from_utf8_lossy(&bytes).to_string();

    let size_bytes = bytes.len();
    let size_kb = size_bytes as f64 / 1024.0;

    let duration = start_time.elapsed().as_millis();

    Ok(Response {
        body,
        time: duration,
        status: response_status,
        size: size_kb,
        headers: response_headers,
        is_response_json_type,
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![make_request])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
