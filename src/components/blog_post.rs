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
    let id = move || {
        params.with(|params| {
            params.as_ref()
                .map(|params| params.id)
                .unwrap_or_default()
        })
    };
    
    view! { 
        <div class="prose max-w-none">
        <Suspense>
            {
                match posts.get() {
                    None => view! { <p>{ "Loading..." }</p> },
                    Some(Ok(data)) => view! {
                        <p>
                        <ul>
                            {
                                data.into_iter().map(|post| {
                                    view! {
                                        <li>
                                            <div inner_html={post.content}></div>
                                        </li>
                                    }
                                }).collect::<Vec<_>>()
                            }
                        </ul>
                        </p>
                    },
                    Some(Err(_)) => view! { <p>{ "Error loading posts" }</p> },
                }
            }
            </Suspense>
        </div> 
    }
}