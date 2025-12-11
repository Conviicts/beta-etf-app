import s from "./border-animate.module.scss"

export const BorderAnimate = () => {
  return (
    <div className={s.border}>
      <div className={s.borderInner} />
    </div>
  )
}
