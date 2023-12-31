use leptos::*;

#[component]
pub fn Avatar() -> impl IntoView {
    view! {
        <div class="flex items-center bg-white rounded-full shadow-md overflow-hidden">
            <img class="rounded-full" src="/../public/images/avatar.jpg" alt="my potrait" height="256px" widht="256px" />
            <div class="flex flex-col justify-center px-4 py-2">
                <span class="font-semibold text-lg text-gray-800">Robert Kommeter</span>
                <span class="text-sm text-gray-500">Software engineer</span>
            </div>
        </div>
    }
}