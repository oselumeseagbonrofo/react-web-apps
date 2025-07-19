export default function Section({children, ...props}){
    return(
        <section {...props}>
        <h2>{props.title}</h2>
        {children}
        </section>
    )
}