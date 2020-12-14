import React, { FunctionComponent, CSSProperties } from "react"

const CostumeCheckbox: FunctionComponent<{
  onChange: () => void
  isOn: boolean
  color: string
}> = props => {
  // @ts-ignore
  const color: CSSProperties = { "--toggleBgColorActive": props.color }
  return (
    <label style={color}>
      <input
        type="checkbox"
        checked={props.isOn}
        onChange={props.onChange}
      />
      <span/>
    </label>
  )
}

export default CostumeCheckbox