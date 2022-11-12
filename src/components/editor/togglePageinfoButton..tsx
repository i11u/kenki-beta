import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'

const TogglePageinfoButton = () => {
  let togglePageinfo: () => void
  const colorTheme = colorThemeSelector.useColorTheme()

  return (
    <button
      type="button"
      className="editor-toggle-pageinfo-button"
      style={{
        background: colorTheme.editorButton,
        boxShadow: `0 1px 1px 1px ${colorTheme.boxShadow}`,
      }}
      onClick={() => togglePageinfo()}
    >
      <svg
        id="_レイヤー_1"
        className="editor-toggle-pageinfo-button-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <path d="M51.436,87.119c-8.344,.391-17.629,.905-25.192-3.293-7.17-3.98-10.867-11.654-12.901-19.286-3.76-14.104-4.074-33.54,9.121-43.034,7.149-5.144,16.311-7.016,24.81-8.616,8.813-1.659,18.327-2.128,26.083,3.1,6.603,4.45,10.861,11.933,13.204,19.385,2.605,8.283,3.107,17.281,.967,25.726-1.993,7.867-6.312,14.992-12.766,19.984-6.056,4.684-13.685,7.447-21.374,7.16-1.838-.069-3.627-.335-5.414-.77-3.126-.761-4.459,4.06-1.329,4.821,17.648,4.295,36.173-6.533,43.251-22.799,3.908-8.981,4.782-18.909,3.152-28.528-1.526-9.009-5.379-18.001-11.713-24.685-3.162-3.337-6.988-5.953-11.288-7.587-4.829-1.835-10.159-2.209-15.274-1.837-5.187,.378-10.311,1.425-15.369,2.596-4.705,1.089-9.35,2.423-13.748,4.444-8.414,3.866-14.475,10.739-17.353,19.521-2.75,8.393-2.597,17.56-1.136,26.181,1.476,8.712,4.459,17.864,10.859,24.242,7.013,6.988,16.965,8.542,26.467,8.49,2.316-.013,4.63-.109,6.944-.218,3.204-.15,3.222-5.151,0-5h0Z" />
        <path d="M44.982,34.332c.099,.025,.195,.057,.29,.097l-.597-.252c.139,.062,.269,.139,.391,.231l-.506-.391c.141,.11,.266,.235,.378,.375l-.391-.506c.118,.153,.215,.317,.293,.493l-.252-.597c.08,.189,.134,.384,.162,.587l-.089-.665c.019,.164,.02,.328,0,.492l.089-.665c-.02,.139-.053,.274-.103,.406l3.672-1.494c-.03-.019-.058-.039-.087-.06l.506,.391c-.103-.08-.194-.171-.275-.273l.391,.506c-.087-.114-.157-.237-.215-.368l.252,.597c-.06-.143-.101-.291-.125-.444l.089,.665c-.02-.15-.022-.3-.003-.45l-.089,.665c.017-.112,.045-.219,.086-.324l-.252,.597c.039-.092,.088-.178,.148-.258l-.391,.506c.056-.071,.119-.134,.19-.191l-.506,.391c.062-.047,.126-.087,.197-.119l-.597,.252c.066-.027,.132-.045,.203-.055l-.665,.089c.08-.009,.158-.008,.237,.003l-.665-.089c.091,.015,.177,.04,.262,.075l-.597-.252c.105,.047,.202,.105,.293,.176l-.506-.391c.089,.072,.169,.153,.24,.243l-.391-.506c.06,.081,.11,.166,.15,.258l-.252-.597c.028,.071,.048,.143,.06,.218l-.089-.665c.007,.064,.008,.127,0,.191l.089-.665c-.009,.055-.023,.107-.044,.159l.252-.597c-.024,.054-.053,.102-.089,.149l.391-.506c-.02,.024-.041,.047-.063,.07h3.536c-.68-.651-1.359-1.302-2.039-1.953-.469-.45-1.113-.732-1.768-.732-.344-.013-.665,.059-.963,.215-.31,.101-.578,.273-.805,.517-.437,.476-.762,1.102-.732,1.768,.029,.655,.247,1.303,.732,1.768,.68,.651,1.359,1.302,2.039,1.953,.226,.244,.495,.416,.805,.517,.298,.157,.619,.228,.963,.215,.658-.029,1.298-.25,1.768-.732,.586-.603,.889-1.338,.931-2.173,.002-.037,.003-.073,.002-.109-.004-.122-.04-.314-.05-.387-.012-.086-.026-.266-.054-.387-.008-.037-.018-.073-.03-.109-.077-.241-.191-.491-.303-.718-.127-.257-.335-.477-.51-.697-.065-.082-.135-.156-.215-.224-.488-.413-.924-.704-1.55-.884-.566-.163-1.248-.173-1.816-.007s-1.168,.503-1.555,.957c-.176,.207-.405,.464-.532,.73-.129,.269-.27,.555-.34,.849-.169,.706-.137,1.213-.022,1.913,.019,.117,.046,.232,.086,.344,.112,.312,.231,.634,.406,.919,.357,.583,.792,1.005,1.36,1.377,.39,.226,.811,.34,1.262,.341,.344,.013,.665-.059,.963-.215,.31-.101,.578-.273,.805-.517,.31-.312,.524-.68,.643-1.103,.126-.336,.154-.724,.192-1.07,.017-.152,.019-.302,.004-.454-.032-.333-.068-.722-.17-1.056-.103-.34-.247-.673-.412-.986-.161-.306-.395-.578-.609-.844-.096-.119-.2-.23-.318-.328-.263-.217-.543-.461-.853-.62-.241-.123-.5-.226-.753-.322-.078-.03-.156-.055-.237-.075-.638-.16-1.354-.083-1.926,.252-.291,.157-.525,.372-.701,.644-.221,.241-.37,.525-.447,.85-.146,.64-.114,1.358,.252,1.926,.349,.541,.855,.989,1.494,1.149h0Z" />
        <path d="M44.228,51.245c.185-.289,.365-.544,.594-.797,.019-.021,.729-.611,.73-.625-.002,.042-.36-.024-.389-.049-.583-.486-.306-.479-.221,.11,.035,.243-.057,1.412-.09,1.939-.071,1.157-.143,2.314-.214,3.471-.134,2.169-.267,4.339-.401,6.508-.125,2.03-.469,4.176-.254,6.204,.44,4.153,4.329,6.074,8.108,4.738,1.676-.592,3.003-1.633,4.216-2.907,1.153-1.21,2.161-2.516,3.709-3.227,1.227-.564,1.531-2.337,.897-3.42-.737-1.26-2.189-1.463-3.42-.897-1.71,.786-3.007,2.162-4.265,3.52-.455,.491-1.289,1.377-1.574,1.586-.636,.467-.981,.613-1.695,.759-.312,.063-.36,.071-.142,.024-.175,.011-.351,.011-.526,0,.61,.056-.773-.148-.169-.064,.254,.036-.091-.116-.042,.031-.116-.348-.144-.596-.147-.988-.017-2.139,.242-4.309,.373-6.444,.138-2.242,.276-4.483,.414-6.725,.119-1.932,.508-4.092-.094-5.98-.701-2.199-2.907-3.609-5.198-3.068-1.987,.469-3.459,2.128-4.516,3.777-1.742,2.717,2.584,5.227,4.317,2.524h0Z" />
      </svg>
    </button>
  )
}

export default TogglePageinfoButton
