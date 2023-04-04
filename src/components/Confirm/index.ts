import { createApp } from "vue"
import Confirm from "./src/ConfirmCom.vue"

let frg: any;

const open = () => {
  close()
  const app = createApp(Confirm, {

  })
  frg = document.createElement("div")
  document.body.appendChild(frg)
  // @ts-ignore
  app.mount(frg)
}

const close = () => {
  if(frg) {
    document.body.removeChild(frg)
    frg = null
  }
}

export default {
  open,
  close
}
