import { colorThemeSelector } from '../../../jotai-hooks/colorTheme/selector'

const RedoButton = () => {
  let redo: () => void
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <button
      type="button"
      className="editor-left-buttons-button disabled"
      style={{
        background: colorTheme.editorButton,
        boxShadow: `0 1px 1px 1px ${colorTheme.boxShadow}`,
      }}
      onClick={() => redo()}
    >
      <svg
        id="_レイヤー_1"
        className="editor-left-buttons-button-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        fill={colorTheme.icon}
      >
        <path d="M82.96,60.054c-1.032,4.087-1.471,8.325-1.251,12.535l2.5-2.5c-5.649-.107-11.299-.215-16.948-.322-1.351-.026-2.5,1.167-2.5,2.5,0,1.376,1.145,2.474,2.5,2.5,5.649,.107,11.299,.215,16.948,.322,1.3,.025,2.57-1.166,2.5-2.5-.198-3.79,.143-7.526,1.072-11.206,.33-1.308-.425-2.712-1.746-3.075-1.284-.353-2.744,.432-3.075,1.746h0Z" />
        <path d="M84.265,70.747c-5.373-15.116-12.634-32.491-28.255-39.511-7.17-3.222-15.252-3.881-22.454-.375-6.204,3.02-10.669,8.74-13.701,14.793-3.744,7.475-5.83,15.654-7.637,23.774-.698,3.135,4.122,4.474,4.821,1.329,1.478-6.641,3.101-13.343,5.763-19.625,2.315-5.463,5.582-11.027,10.604-14.409,5.56-3.745,12.179-4.04,18.4-1.833,6.741,2.392,12.187,7.441,16.236,13.218,5.109,7.291,8.437,15.627,11.402,23.968,.452,1.272,1.706,2.123,3.075,1.746,1.231-.338,2.2-1.797,1.746-3.075h0Z" />
      </svg>
    </button>
  )
}

export default RedoButton
