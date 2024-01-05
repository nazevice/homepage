use gray_matter::engine::YAML;
use gray_matter::{Matter, ParsedEntity, ParsedEntityStruct};
use leptos::*;
use pulldown_cmark::{html, Options, Parser};
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

pub fn parse_post() -> String {
    logging::log!("parse");
    const MARKDOWN_CONTENT: &str = include_str!("../blog/test.md");
    let matter = Matter::<YAML>::new();
    let result: ParsedEntity = matter.parse(MARKDOWN_CONTENT);
    let result_with_struct: ParsedEntityStruct<PostMetadata> = matter
        .parse_with_struct::<PostMetadata>(MARKDOWN_CONTENT)
        .unwrap();
    logging::log!("{:?}", result_with_struct.data);
    logging::log!("{:?}", result.content);
    let options = Options::all();
    let parser = Parser::new_ext(&result.content, options);

    // Write to String buffer.
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    logging::log!("{:?}", html_output);
    html_output
}
