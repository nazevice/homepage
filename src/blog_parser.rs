use gray_matter::engine::YAML;
use gray_matter::Matter;
use leptos::*;
use serde::Deserialize;
use std::fs;
use std::io;

#[derive(Deserialize, Debug, Clone)]
pub struct PostMetadata {
    pub title: String,
    pub description: String,
    pub date: String,
    pub tags: Vec<String>,
    pub thumbnail_path: String,
}

#[derive(Clone, Debug)]
pub struct PostData {
    pub metadata: PostMetadata,
    pub content: String,
}

fn read_markdown_file(file_path: &str) -> io::Result<String> {
    fs::read_to_string(file_path)
}

pub fn parse_post() {
    logging::log!("parse");
    const MARKDOWN_CONTENT: &str = include_str!("../blog/test.md");
    let matter = Matter::<YAML>::new();
    let result_with_struct = matter.parse_with_struct::<PostMetadata>(MARKDOWN_CONTENT).unwrap();
    logging::log!("{:?}", result_with_struct.data)
}
