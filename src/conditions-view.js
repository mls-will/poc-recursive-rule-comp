function ConditionsView(props) {
  const hasChildren = props.items && props.items.length

  return (
    <>
      <div className={"ConditionsView " + (props.header ? "hasBorder": "") }>
        {props.header ? 
          <div className="ConditionsHeader">{props.header}</div> :
          <></>
        }
        {props.fact ?
          <div className="FactView">
            <input className="factProp" type="text" defaultValue={props.fact.fact}></input>
            <input className="factProp" type="text" defaultValue={props.fact.operator}></input>
            <input className="factProp" type="text" defaultValue={props.fact.value}></input>
          </div> : 
          <></>
        }
        {hasChildren && props.items.map((item) => (
          <ConditionsView key={item.key} {...item} />
        ))}
      </div>
    </>
  )
}

export default ConditionsView;
