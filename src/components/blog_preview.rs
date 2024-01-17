use crate::blog_parser::PostMetadata;
use leptos::*;

#[component]
pub fn BlogPreview(id: u16, metadata: PostMetadata) -> impl IntoView {
    view! {
       <article>
            <a href={format!("/post/{}", id)} class="flex items-start gap-4">
                <div>
                    <img class="rounded-25" src={metadata.thumbnail_path} alt="my portrait" height="256" width="256" />
                </div>
                <div>
                    <h2>{ metadata.title }</h2>
                    <p>{ metadata.description }</p>
                </div>
            </a>
        </article>
    }
}
