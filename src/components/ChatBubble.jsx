export const ChatBubble = (props) => {
  return (
    <div className={`chat__message ${props.sender}` } ref={props.reference}>
      <div className='chat__bubble'>
        <div className='chat__bubble-identification'>
          <img src='https://avatars.dicebear.com/api/human/:seed.svg' alt="profile"/>
          <h4>raul puigbo</h4>
        </div>
        <p className='chat__bubble-content'>{props.message}</p>
      </div>
    </div>
  )
}
