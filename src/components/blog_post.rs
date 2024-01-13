use leptos::*;
use crate::blog_parser::get_posts;

#[component]
pub fn BlogPost() -> impl IntoView {
    view! { <div class="prose max-w-none" inner_html="<div>test</div>"></div> }
}