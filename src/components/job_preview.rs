use leptos::*;

#[component]
pub fn JobPreview(
    company: String, 
    job_title: String,
    job_start: u16,
    job_end: u16,
    children: Children
) -> impl IntoView {
    view! {
        <div>
            <h3>{company}</h3>
            <h4>{job_title}</h4>
            <p>{job_start} - {job_end}</p>
            {children()}
        </div>
    }
}