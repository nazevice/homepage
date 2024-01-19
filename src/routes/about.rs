use leptos::*;

#[component]
pub fn About() -> impl IntoView {
    view! {
        <div class="grid grid-rows-1 w-1/2 bg-white p-8 rounded-lg">
            <div class="flex justify-between">
                <div>
                    <h1 class="text-3xl font-bold">Robert Kommeter</h1>
                    <div class="flex items-center">
                        <svg class="h-4 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>
                        <span>Isny, Germany</span>
                    </div>
                    <p>
                        Full Stack Software Engineer with experience in embedded systems<br/>
                        and web applications.
                    </p>
                </div>
                <img class="rounded-mg h-32" src="/images/avatar.jpg" alt="my potrait" height="128px" widht="128px" />
            </div>
            <div>
                <h2 class="text-2xl font-bold">About me</h2>
                <p>
                    I am a Full Stack Engineer with over five years of experience in the web environment, 
                    specializing in data-intensive web applications. 
                    My current expertise centers around Rust, React, Electron, and Tauri, which form the core of my development work.
                </p>
            </div>
            <div>
                <h2 class="text-2xl font-bold">Work experience</h2>
                <div>

                </div>
            </div>
        </div>
     }
}
