use app::*;
use leptos::*;

mod blog_parser;
mod app;
mod components;

pub fn main() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();
    logging::log!("csr mode - mounting to body");

    mount_to_body(|| {
        view! { <App/> }
    });
}
