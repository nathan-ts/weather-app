export default function Link(props) {
  return (
    <a target="_blank" rel="noreferrer"
      className="underline
      " 
      href={props.url}
    >
      {props.children}
    </a>
  )
}