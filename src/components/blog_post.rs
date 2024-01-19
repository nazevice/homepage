use leptos::*;
use leptos_router::*;

use crate::blog_parser::PostData;

#[derive(Params, PartialEq)]
struct PostParams {
    id: u16
}

#[component]
pub fn BlogPost() -> impl IntoView {
    let params = use_params::<PostParams>();
    let posts = use_context::<Resource<(), Result<Vec<PostData>, ServerFnError>>>().expect("Unable to load posts");
    let post_id = params.with(|params| params.as_ref().map(|params| params.id).unwrap_or_default());

    view! { 
        <div class="prose max-w-none">
        <Suspense>
            {
                match posts.get() {
                    None => view! { <div>{ "Loading..." }</div> },
                    Some(Ok(data)) => {
                        let post = data.iter().find(|&post| post.id == post_id);
                        match post {
                            Some(post) => view! {
                                <div>
                                    <h1>{&post.metadata.title}</h1>
                                    <div inner_html={&post.content}></div>
                                </div>
                            },
                            None => view! { <div>{ "Post not found." }</div> },
                        }
                    },
                    Some(Err(_)) => view! { <div>{ "Error loading posts" }</div> },
                }
            }
            </Suspense>
        </div> 
    }
}