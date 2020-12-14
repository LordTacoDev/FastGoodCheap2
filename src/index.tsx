import React, { FunctionComponent, useState, useEffect } from "react"
import ReactDOM from "react-dom"
import ActiveTextContainer from "./ActiveText"
import Option from "./Option"
import useCreateTexts, { TextsContext, ChangeTextsContext } from "./Texts"

const Space = () => <div />
const colors = ["#009975", "#145374", "#c72c41"]

const numOptions = (() => {
  const URLparams = new URLSearchParams(window.location.search)
  const numOption = URLparams.get("num")
  return Number(numOption) || 3
})()

const defaultTexts = (() => {
  const defaults = ["Bueno", "Bonito", "Barato"]
  const missing = Math.max(0, numOptions - 3)
  return defaults.concat(Array(missing).fill("?"))
})()

const App: FunctionComponent = () => {
  const [texts, changeText] = useCreateTexts(defaultTexts.slice(0, numOptions))
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 40)
  }, [])

  const style = {
    gridTemplateRows: `1fr ${"auto ".repeat(numOptions)} 2fr auto`,
    visibility: isVisible ? "initial" : ("hidden" as "initial" | "hidden"),
  }

  return (
    <>
      <TextsContext.Provider value={texts}>
        <main style={style}>
          <ChangeTextsContext.Provider value={changeText}>
            <ActiveTextContainer numOption={numOptions}>
              <Space />
              {[...Array(numOptions).keys()].map(id => (
                <Option key={id} id={id} color={colors[id % colors.length]} />
              ))}
              <Space />
            </ActiveTextContainer>
          </ChangeTextsContext.Provider>
        </main>
      </TextsContext.Provider>
    </>
  )
}

const DOM_ID = document.getElementById("root")
ReactDOM.render(<App />, DOM_ID)