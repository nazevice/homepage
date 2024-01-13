use gray_matter::engine::YAML;
use gray_matter::{Matter, ParsedEntity, ParsedEntityStruct};
use leptos::*;
use pulldown_cmark::{html, Options, Parser};
use serde::{Deserialize, Serialize};
use std::fs::{self, metadata};
use std::io;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PostMetadata {
    pub title: String,
    pub description: String,
    pub date: String,
    pub tags: Vec<String>,
    pub thumbnail_path: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct PostData {
    pub metadata: PostMetadata,
    pub content: String,
}

fn read_markdown_file(file_path: &str) -> io::Result<String> {
    fs::read_to_string(file_path)
}

#[server(GetPosts, "/api")]
pub async fn get_posts() -> Result<PostData, ServerFnError> {
    let file_path: &str = "public/blog/test.md";
    let matter: Matter<YAML> = Matter::<YAML>::new();
    match read_markdown_file(file_path) {
        Ok(contents) => {
            let result: ParsedEntity = matter.parse(&contents);
            let result_with_struct: ParsedEntityStruct<PostMetadata> = matter
                .parse_with_struct::<PostMetadata>(&contents)
                .unwrap();
            logging::log!("{:?}", result_with_struct.data);
            logging::log!("{:?}", result.content);
            let options = Options::all();
            let parser = Parser::new_ext(&result.content, options);
            let mut html_output = String::new();
            html::push_html(&mut html_output, parser);
            logging::log!("{:?}", html_output);
            let post: PostData = PostData{ metadata: result_with_struct.data, content: html_output};
            Ok(post)
        }
        Err(e) => {
            eprintln!("Error reading file: {}", e);
            Err(ServerFnError::ServerError("Could not extract method and query...".to_string()))
        }
    }
}

pub fn parse_post() -> String {
    /*
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
    
     */
    // Write to String buffer.
    let mut html_output = String::new();
    html_output
}
