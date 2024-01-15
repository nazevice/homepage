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

#[server(GetPosts, "/api", "GetJson")]
pub async fn get_posts() -> Result<Vec<PostData>, ServerFnError> {
    let directory = "public/blog/";
    let mut posts = Vec::new(); // Declare 'posts' as mutable

    for entry in fs::read_dir(directory)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_file() {
            logging::log!("{:?}", path);
            if let Some(path_str) = path.to_str() {
                match create_post(path_str) {
                    Ok(post) => posts.push(post),
                    Err(e) => return Err(ServerFnError::ServerError(e.to_string())),
                }
            } else {
                return Err(ServerFnError::ServerError("Invalid UTF-8 path".to_string()));
            }
        }
    }
    Ok(posts)
}

fn create_post(file_path: &str) -> Result<PostData, String> {
    match read_markdown_file(file_path) {
        Ok(contents) => {
            let matter: Matter<YAML> = Matter::<YAML>::new();
            let result: ParsedEntity = matter.parse(&contents);
            let result_with_struct: ParsedEntityStruct<PostMetadata> =
                matter.parse_with_struct::<PostMetadata>(&contents).unwrap();
            let options: Options = Options::all();
            let parser: Parser<'_, '_> = Parser::new_ext(&result.content, options);
            let mut html_output = String::new();
            html::push_html(&mut html_output, parser);
            logging::log!("{:?}", html_output);
            let post: PostData = PostData {
                metadata: result_with_struct.data,
                content: html_output,
            };
            Ok(post)
        }
        Err(e) => {
            eprintln!("Error reading file: {}", e);
            Err(e.to_string())
        }
    }
}
