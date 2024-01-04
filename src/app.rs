use leptos::*;
use leptos_meta::*;
use leptos_router::*;
use crate::{components::avatar::*, blog_parser};

#[component]
pub fn App() -> impl IntoView {
    provide_meta_context();
    blog_parser::parse_post();
    view! {
        <Stylesheet id="leptos" href="/pkg/homepage.css"/>

        <Router>
            <Routes>
                <Route path="/" view=HomePage/>
                <Route path="/:else" view=ErrorPage/>
            </Routes>
        </Router>
    }
}

#[component]
fn HomePage() -> impl IntoView {
    view! {
        <main class="min-h-screen py-20 w-full space-y-8">
            <Avatar></Avatar>
        </main>
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
