export default function Link(props) {
  return (
    <a target="_blank" rel="noreferrer"
      className="
        underline underline-offset-4
        text-zinc-800
      " 
      href={props.url}
    >
      {props.children}
    </a>
  )
}