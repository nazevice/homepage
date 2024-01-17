use crate::blog_parser::{get_posts, PostData};
use crate::{components::avatar::*, components::blog_post::*, components::blog_preview::*};
use leptos::*;
use leptos_meta::*;
use leptos_router::*;

#[component]
pub fn App() -> impl IntoView {
    //let (posts, set_posts) = create_signal("");
    provide_meta_context();

    view! {
        <Stylesheet id="leptos" href="/pkg/homepage.css"/>
        <main
    class="flex flex-col items-center justify-start min-h-screen space-y-8 py-10"
    style="background-color: rgb(245, 245, 244);
        background-image: 
            radial-gradient(at 4% 64%, rgb(255, 255, 255) 0, transparent 59%), 
            radial-gradient(at 35% 70%, rgb(96, 165, 250) 0, transparent 67%), 
            radial-gradient(at 20% 46%, rgb(52, 211, 153) 0, transparent 42%), 
            radial-gradient(at 79% 88%, rgb(94, 234, 212) 0, transparent 1%), 
            radial-gradient(at 81% 29%, rgb(129, 140, 248) 0, transparent 95%), 
            radial-gradient(at 76% 21%, rgb(7, 89, 133) 0, transparent 28%);">
            <nav class="flex justify-between px-4 w-2/3">
            <a href="/">Home</a>
            <div class="space-x-4">
                <a href="/blog">Blog</a>
                <a href="#">Projects</a>
                <a href="#">About</a>
            </div>
        </nav>
        <Router>
            <Routes>
                <Route path="/" view=HomePage/>
                <Route path="/blog" view=Blog ssr=SsrMode::Async />
                <Route path="/:else" view=ErrorPage/>
                <Route path="/post/:id" view={BlogPost} />
            </Routes>
        </Router>
        </main>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
    <div class="flex justify-center w-full">
      <Avatar></Avatar>
    </div>
              <BlogPost></BlogPost>
      }
}

#[component]
fn Blog() -> impl IntoView {
    let posts: Resource<(), Result<Vec<PostData>, ServerFnError>> =
        create_local_resource(|| (), |_| async move { get_posts().await });

    view! {
        <div class="flex justify-center w-full">
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
                                            <BlogPreview id=post.id metadata=post.metadata></BlogPreview>
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

#[component]
fn ErrorPage() -> impl IntoView {
    let params = use_params_map();
    let p_unknown = move || params.with(|p| p.get("else").cloned().unwrap_or_default());

    let unknown = p_unknown();

    view! {
        <main class=format!("h-screen w-full flex flex-col items-center justify-center")>
            <p class="">Unknown command: {unknown}</p>
        </main>
    }
}
