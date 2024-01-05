use leptos::*;
use crate::blog_parser::parse_post;

#[component]
pub fn BlogPost() -> impl IntoView {
    view! { <div class="prose max-w-none" inner_html=parse_post()></div> }
}