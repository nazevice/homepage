use crate::blog_parser::{get_posts, PostData};
use crate::{components::avatar::*, components::blog_post::*};
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
                <Route path="/blog" view=Blog />
                <Route path="/:else" view=ErrorPage/>
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
    let posts: Resource<(), Result<PostData, ServerFnError>> = create_resource(|| (), move|_| get_posts());
    view! {
    <div class="flex justify-center w-full">
    <Suspense fallback=move || view! {<p>"Loading..."</p> }>
    {move || match posts.get() {
        None => view! { <p>"Loading..."</p> }.into_view(),
        Some(Ok(data)) => view! { <div inner_html=&data.content></div> }.into_view(),
        Some(Err(_)) => view! { <p>"Error loading posts"</p> }.into_view(),
    }}
    </Suspense>
    </div>
              <BlogPost></BlogPost>
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
