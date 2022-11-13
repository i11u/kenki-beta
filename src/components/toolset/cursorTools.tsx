import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import { EditorState } from '../types'

type Props = {
  setEditorState: (editorState: EditorState) => void
}

const CursorTools = ({ setEditorState }: Props) => {
  const colorTheme = colorThemeSelector.useColorTheme()
  return (
    <div className="toolset-cursor-tools">
      <button
        type="button"
        className="toolset-cursor-tools-button"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
        onClick={() => setEditorState('TEXT')}
      >
        <div className="toolset-cursor-tools-button-hint">t</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M19.691,27.659c21.018,.812,42.061,.866,63.083,.165,3.209-.107,3.224-5.108,0-5-21.022,.702-42.065,.647-63.083-.165-3.218-.124-3.212,4.876,0,5h0Z" />
          <path d="M48.215,25.783c.121,19.716-.255,39.433-1.125,59.131-.142,3.217,4.858,3.21,5,0,.87-19.697,1.246-39.414,1.125-59.131-.02-3.216-5.02-3.223-5,0h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">r</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M9.655,22.819c-.372,19.888-.743,39.776-1.115,59.664-.024,1.272,1.167,2.607,2.5,2.5,10.991-.885,22.021-1.234,33.046-1.026,10.761,.203,21.434,1.098,32.138,2.157,5.567,.551,11.39,.748,16.657-1.441,.963-.4,1.929-1.235,1.835-2.411-1.596-20.11-3.191-40.22-4.787-60.33-.099-1.249-1.069-2.634-2.5-2.5-9.214,.865-18.499,.859-27.709-.062-4.539-.454-9.035-1.364-13.586-1.678-4.619-.318-9.001,.716-13.545,1.318-5.151,.683-10.325-.005-15.427-.752-1.334-.195-2.687,.331-3.075,1.746-.323,1.176,.402,2.879,1.746,3.075,4.666,.683,9.382,1.409,14.112,1.169,4.545-.231,8.963-1.591,13.519-1.641,4.716-.052,9.39,.987,14.058,1.526,4.636,.536,9.297,.844,13.963,.923,5.322,.09,10.644-.127,15.943-.624l-2.5-2.5c1.596,20.11,3.191,40.22,4.787,60.33l1.835-2.411c-4.478,1.861-9.247,1.804-14,1.387-5.242-.46-10.464-1.086-15.715-1.468-10.832-.789-21.703-1.043-32.56-.762-6.087,.157-12.168,.487-18.237,.975l2.5,2.5c.372-19.888,.743-39.776,1.115-59.664,.06-3.219-4.94-3.219-5,0h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">e</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M61.488,78.308c-8.459,.659-16.981,.149-25.275-1.661-6.977-1.523-14.478-3.718-19.557-9.038-4.377-4.585-5.934-11.221-5.168-17.404,.793-6.402,4.258-12.015,9.079-16.194,11.738-10.174,28.49-9.913,42.602-5.718,6.626,1.97,13.256,4.729,17.399,10.541,3.483,4.886,5.206,10.852,4.811,16.843-.806,12.217-12.041,21.659-24.036,21.821-1.466,.02-2.921-.086-4.362-.357-1.326-.249-2.697,.369-3.075,1.746-.335,1.219,.412,2.824,1.746,3.075,14.189,2.671,29.476-6.016,33.645-20.034,2.026-6.813,1.243-14.215-1.605-20.667-3.046-6.899-8.599-12.029-15.473-15.012-15.55-6.748-35.139-8.744-50.115,.493-6.45,3.978-11.737,9.871-14.231,17.093-2.41,6.981-2.054,14.947,1.22,21.586,3.645,7.391,10.987,11.654,18.564,14.121,8.628,2.809,17.902,4.07,26.961,4.05,2.294-.005,4.585-.105,6.871-.284,1.346-.105,2.5-1.074,2.5-2.5,0-1.271-1.146-2.605-2.5-2.5h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">l</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M62.606,18.731c-13.86,17.761-27.72,35.522-41.58,53.282-3.938,5.046-7.876,10.093-11.814,15.139-.83,1.063-1.037,2.499,0,3.536,.864,.864,2.7,1.07,3.536,0,13.86-17.761,27.72-35.522,41.58-53.282,3.938-5.046,7.876-10.093,11.814-15.139,.83-1.063,1.037-2.499,0-3.536-.864-.864-2.7-1.07-3.536,0h0Z" />
          <path d="M89.847,13.579c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M83.56,21.317c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M77.756,27.605c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M70.985,35.827c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M66.632,40.664c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M59.377,48.886c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M56.475,54.206c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M50.188,61.46c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M45.835,67.264c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M39.064,75.003c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M35.195,80.323c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
          <path d="M29.391,87.578c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">a</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M14.518,85.496c8.914-14.878,17.828-29.757,26.742-44.635,2.516-4.2,5.033-8.4,7.549-12.6,1.658-2.767-2.664-5.284-4.317-2.524-8.914,14.878-17.828,29.757-26.742,44.635-2.516,4.2-5.033,8.4-7.549,12.6-1.658,2.767,2.664,5.284,4.317,2.524h0Z" />
          <path d="M43.729,31.026c2.486-1.421,4.972-2.843,7.457-4.264l-3.672-2.823c-.629,3.312-1.258,6.625-1.888,9.937-.243,1.281,.357,2.759,1.746,3.075,1.232,.281,2.814-.372,3.075-1.746,.629-3.312,1.258-6.625,1.888-9.937,.192-1.011-.052-1.976-.896-2.628-.793-.613-1.896-.699-2.777-.195-2.486,1.421-4.972,2.843-7.457,4.264-1.136,.649-1.624,2.293-.897,3.42,.739,1.147,2.205,1.592,3.42,.897h0Z" />
          <path d="M42.84,31.792c.178-.292,.361-.58,.558-.861,.097-.138,.301-.415,.084-.135,.093-.12,.19-.238,.288-.354,.464-.553,.971-1.07,1.513-1.547,.143-.126,.291-.244,.435-.368-.192,.164-.12,.086,.036-.027,.227-.164,.521-.298,.732-.479,.194-.167-.46,.119-.038,.011,.111-.028,.224-.061,.333-.095,.517-.157-.375,.027-.092,.021,.262-.005-.567-.187-.145-.011-.351-.147-.75-.373-.943-.714l-.114-.258c-.037-.28-.056-.326-.056-.136-.108,.325-.071,.785-.105,1.124-.08,.803-.161,1.605-.241,2.408-.17,1.694-.339,3.389-.509,5.083l3.165-2.411c-.978-.196-1.943-.446-2.889-.765-.436-.147-.866-.31-1.294-.479,.464,.183-.154-.067-.249-.11-.245-.111-.487-.226-.728-.344-.859-.425-1.692-.902-2.492-1.431-.384-.254-.759-.52-1.128-.795,.387,.288-.142-.114-.218-.176-.238-.194-.47-.394-.701-.596v3.536c.836-.886,1.715-1.731,2.641-2.522,.232-.198,.466-.392,.703-.584,.118-.096,.238-.191,.357-.285-.205,.157-.193,.148,.037-.027,.49-.362,.983-.719,1.489-1.059,1.012-.678,2.06-1.302,3.14-1.865,.54-.282,1.087-.549,1.642-.801,.082-.037,.936-.401,.451-.202,.282-.116,.565-.227,.849-.337l-3.165-2.411c.084,4.389-.378,7.887-1.606,12.104-.365,1.255,.443,2.778,1.746,3.075,1.337,.305,2.684-.402,3.075-1.746,1.265-4.348,1.871-8.906,1.784-13.433-.029-1.486-1.596-3.013-3.165-2.411-5.114,1.965-9.748,4.973-13.516,8.966-.881,.934-1.04,2.622,0,3.536,3.387,2.974,7.473,5.095,11.904,5.983,1.709,.343,2.996-.724,3.165-2.411,.21-2.096,.42-4.192,.63-6.287,.11-1.095,.329-2.218,.135-3.313-.228-1.291-1.217-2.349-2.467-2.729-2.063-.627-3.959,.498-5.512,1.722-1.538,1.212-2.823,2.749-3.838,4.419-.68,1.119-.283,2.797,.897,3.42,1.215,.642,2.695,.297,3.42-.897h0Z" />
          <path d="M66.754,35.504c-3.484,7.674-6.972,15.352-10.893,22.815-1.972,3.754-4.053,7.453-6.293,11.055-1.119,1.799-2.277,3.574-3.48,5.319-1.128,1.636-3.149,3.56-3.144,5.669,.007,3.013,3.272,3.664,5.535,4.528,2.439,.932,4.879,1.864,7.318,2.796,1.262,.482,2.742-.533,3.075-1.746,.387-1.408-.48-2.592-1.746-3.075-1.753-.67-3.507-1.34-5.26-2.01-.839-.32-1.677-.641-2.516-.961-.457-.175-.915-.35-1.372-.524l-.457-.175c-.547-.21-.61-.233-.187-.069l.643,1.103c-.132,.579-.071,.624,.184,.134,.18-.244,.359-.489,.537-.734,.267-.368,.532-.737,.795-1.108,.613-.865,1.215-1.738,1.805-2.618,1.096-1.634,2.155-3.292,3.181-4.971,2.134-3.49,4.123-7.067,6.014-10.693,3.792-7.273,7.187-14.744,10.576-22.21,.558-1.229,.352-2.69-.897-3.42-1.073-.627-2.86-.338-3.42,.897h0Z" />
          <path d="M68.621,30.971c-1.327-.391-2.167-1.261-2.743-2.496v2.524c4.636-6.736,11.554-11.768,19.358-14.182l-3.165-2.411c-.262,9.03-.119,18.065,.427,27.081l3.762-2.159c-1.757-.88-3.515-1.76-5.272-2.641-1.116-.559-2.827-.392-3.42,.897-7.078,15.375-14.157,30.751-21.235,46.126-.564,1.226-.348,2.693,.897,3.42,1.078,.63,2.853,.335,3.42-.897,7.078-15.375,14.157-30.751,21.235-46.126l-3.42,.897c1.757,.88,3.515,1.76,5.272,2.641,1.58,.791,3.884-.143,3.762-2.159-.546-9.017-.689-18.052-.427-27.081,.046-1.591-1.639-2.882-3.165-2.411-6.011,1.859-11.539,5.031-16.172,9.291-2.225,2.045-4.49,4.431-6.063,7.026-1.958,3.231,3.011,6.711,5.619,7.48,3.093,.912,4.414-3.912,1.329-4.821h0Z" />
          <path d="M41.221,31.452c-9.359,14.33-18.358,28.894-26.975,43.683-2.439,4.185-4.846,8.389-7.225,12.609l4.569,1.926c1.857-7.634,5.721-14.472,9.671-21.191,4.309-7.328,8.634-14.645,12.952-21.968,2.486-4.216,4.972-8.432,7.457-12.648,1.638-2.778-2.682-5.297-4.317-2.524-4.424,7.503-8.848,15.006-13.272,22.509-4.218,7.154-8.72,14.217-12.43,21.653-2.048,4.104-3.797,8.375-4.883,12.838-.656,2.698,3.142,4.458,4.569,1.926,8.405-14.91,17.184-29.607,26.339-44.069,2.591-4.093,5.212-8.166,7.861-12.222,1.765-2.702-2.563-5.21-4.317-2.524h0Z" />
          <path d="M40.342,33.894c-1.702-1.831-3.405-3.662-5.107-5.493v3.536c4.978-4.952,10.613-9.11,16.8-12.429l-3.762-2.159c-.168,3.897-.467,7.787-.913,11.663-.21,1.825-.455,3.645-.736,5.461-.124,.801-.221,1.618-.418,2.406,.021-.083-.183,.817-.14,.528-.171,.261-.199,.326-.084,.195,.163-.079,.104-.047-.176,.097-2.846,1.503-.323,5.82,2.524,4.317,1.667-.881,2.482-2.618,2.823-4.398,.432-2.263,.708-4.569,.996-6.854,.563-4.455,.932-8.93,1.125-13.416,.085-1.969-2.166-3.015-3.762-2.159-6.538,3.508-12.552,7.979-17.812,13.211-.983,.977-.919,2.547,0,3.536l5.107,5.493c2.196,2.362,5.725-1.18,3.536-3.536h0Z" />
          <path d="M42.107,36.929l1.067,2.43,1.494-3.672c-.054,.012-.107,.022-.161,.029l.665-.089c-.141,.016-.281,.015-.423-.002l.665,.089c-.163-.023-.319-.066-.472-.128l.597,.252c-.162-.069-.312-.158-.452-.265l.506,.391c-.12-.096-.228-.203-.323-.323l.391,.506c-.093-.122-.169-.252-.229-.393l.252,.597c-.029-.071-.052-.143-.072-.218-.077-.325-.227-.609-.447-.85-.176-.272-.41-.487-.701-.644-.287-.183-.597-.282-.929-.297-.332-.074-.665-.06-.997,.045l-.597,.252c-.376,.222-.675,.521-.897,.897l-.252,.597c-.119,.443-.119,.886,0,1.329,.083,.319,.225,.625,.371,.919,.099,.199,.242,.367,.378,.542,.14,.181,.27,.363,.443,.514,.241,.21,.496,.417,.771,.585,.276,.168,.593,.283,.89,.399,.112,.044,.227,.078,.345,.1,.322,.06,.658,.121,.989,.119,.065,0,.13-.005,.195-.013,.274-.03,.556-.058,.826-.118,.424-.119,.791-.333,1.103-.643,.244-.226,.416-.495,.517-.805,.157-.298,.228-.619,.215-.963-.001-.451-.115-.872-.341-1.262l-1.067-2.43c-.157-.291-.372-.525-.644-.701-.241-.221-.525-.37-.85-.447-.332-.104-.665-.119-.997-.045-.333,.015-.643,.114-.929,.297l-.506,.391c-.31,.312-.524,.68-.643,1.103l-.089,.665c.001,.451,.115,.872,.341,1.262h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">p</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M69.724,88.733c-10.403,.529-20.807,1.058-31.21,1.587-2.642,.134-5.284,.27-7.926,.403-1.988,.1-4.042,.247-6.021-.048-1.755-.262-3.48-.886-4.628-2.302-1.235-1.524-1.766-3.524-2.295-5.373-5.446-19.035-7.083-39.085-4.907-58.76,.245-2.22,.446-4.494,.976-6.668,.397-1.628,1.046-2.983,2.671-3.653,2.106-.867,4.641-1.059,6.876-1.359,2.487-.334,4.99-.562,7.494-.716,10.083-.618,20.23,.07,30.222,1.474,5.057,.711,10.089,1.591,15.101,2.562,1.19,.231,2.381,.462,3.568,.706,.873,.18,1.85,.317,2.638,.761,1.55,.874,1.638,3.176,1.886,4.735,1.618,10.173,2.967,20.388,4.065,30.63,.547,5.102,1.046,10.212,1.454,15.327,.322,4.046,.577,8.271-.673,12.194-2.348,7.369-10.312,9.173-17.155,9.531-1.848,.097-3.698,.108-5.548,.092-3.218-.029-3.221,4.971,0,5,7.938,.071,17.217-.313,23.256-6.209,7.192-7.022,5.387-18.112,4.551-27.099-1.033-11.111-2.367-22.193-3.978-33.235-.401-2.746-.807-5.493-1.258-8.232-.37-2.246-1.031-4.576-2.805-6.134-1.891-1.66-4.383-2.042-6.767-2.515-2.7-.535-5.405-1.047-8.117-1.523-10.801-1.895-21.748-3.274-32.729-3.29-5.534-.008-11.053,.357-16.534,1.119-4.785,.665-10.123,1.316-12.286,6.301-.983,2.266-1.223,4.725-1.54,7.151-.347,2.655-.625,5.319-.834,7.988-.417,5.339-.553,10.7-.414,16.053,.277,10.686,1.645,21.369,4.07,31.78,.604,2.595,1.272,5.177,2.016,7.736,.66,2.269,1.455,4.554,2.897,6.453,2.989,3.935,7.856,4.733,12.516,4.617,10.981-.273,21.976-1.099,32.946-1.657,2.807-.143,5.615-.286,8.422-.428,3.202-.163,3.221-5.164,0-5h0Z" />
          <path d="M10.408,58.678c4.733-6.419,10.844-12.332,17.781-16.331,3.268-1.884,6.608-2.471,9.984-.535,3.21,1.841,5.64,4.797,8.054,7.538,3.621,4.111,7.243,8.223,10.864,12.334,.893,1.014,2.623,.912,3.536,0,1.006-1.006,.895-2.519,0-3.536-3.457-3.925-6.914-7.849-10.37-11.774-2.825-3.208-5.664-6.592-9.398-8.787-4.019-2.363-8.48-2.597-12.757-.773-4.211,1.797-8.016,4.846-11.457,7.821-3.959,3.423-7.451,7.31-10.555,11.519-.802,1.087-.181,2.79,.897,3.42,1.27,.743,2.617,.193,3.42-.897h0Z" />
          <path d="M53.392,53.148c1.952-2.904,4.351-5.507,7.094-7.683,1.105-.877,2.495-2.071,4.007-1.908,1.634,.177,3.245,1.228,4.644,2.013,5.886,3.302,11.09,7.842,15.095,13.281,.799,1.086,2.168,1.63,3.42,.897,1.071-.626,1.702-2.327,.897-3.42-4.845-6.579-11.06-12.085-18.333-15.854-1.962-1.017-4.069-1.993-6.333-1.914s-4.177,1.246-5.922,2.582c-3.484,2.666-6.439,5.841-8.887,9.483-1.8,2.678,2.53,5.184,4.317,2.524h0Z" />
          <path d="M59.831,28.238c3.217,0,3.223-5,0-5s-3.223,5,0,5h0Z" />
        </svg>
      </button>
      <button
        type="button"
        className="toolset-cursor-tools-button disabled"
        style={{
          backgroundColor: `${colorTheme.editorButton}`,
          boxShadow: `0 2px 2px 2px ${colorTheme.boxShadow}`,
        }}
      >
        <div className="toolset-cursor-tools-button-hint">v</div>
        <svg
          id="_レイヤー_1"
          className="toolset-cursor-tools-button-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M54.426,73.72c-7.728,.331-15.457,.661-23.185,.992-1.973,.084-3.946,.17-5.92,.253-1.243,.052-2.984,.362-4.035-.486-1.013-.818-1.552-2.453-2.067-3.593-.68-1.507-1.237-3.073-1.726-4.652-1.999-6.462-2.576-13.221-2.577-19.956,0-3.462,.151-6.922,.362-10.377,.103-1.682,.221-3.364,.343-5.045,.015-.209,.117-.733,.056-.934l.04-.177c.132-.428-.056-.3-.565,.384,.03,.086,2.598-.114,2.859-.123,15.603-.567,31.206-1.134,46.809-1.701,3.772-.137,7.543-.306,11.316-.41,2.331-.064,5.434-.198,6.428,2.402,.57,1.492,.758,3.175,1.026,4.739,.313,1.826,.579,3.658,.787,5.498,.423,3.728,.656,7.477,.698,11.228,.048,4.23-.146,8.463-.583,12.671-.194,1.864-.346,3.791-.772,5.618-.099,.422-.167,.88-.537,1.141-.626,.441-1.782,.439-2.517,.546-8.729,1.267-17.461,2.515-26.191,3.773-1.338,.193-2.072,1.891-1.746,3.075,.395,1.436,1.734,1.939,3.075,1.746,8.483-1.222,16.967-2.444,25.45-3.666,1.936-.279,3.913-.5,5.425-1.881,1.275-1.165,1.792-2.805,2.054-4.462,.658-4.16,1.069-8.368,1.249-12.575,.354-8.28-.242-16.59-1.695-24.748-.641-3.599-1.529-7.362-5.178-9.034-3.291-1.507-7.062-1.068-10.57-.941-17.097,.621-34.194,1.242-51.291,1.864-2.074,.075-4.183,.046-6.248,.243-2.08,.198-3.683,1.347-4.143,3.462-.402,1.847-.355,3.884-.48,5.768-.126,1.91-.237,3.82-.319,5.733-.323,7.574-.168,15.229,1.383,22.676,.764,3.668,1.923,7.225,3.461,10.641,.733,1.628,1.528,3.361,2.849,4.605,1.492,1.405,3.433,1.929,5.438,1.998,4.052,.139,8.195-.307,12.245-.48,4.193-.179,8.386-.359,12.579-.538l6.413-.274c3.205-.137,3.223-5.138,0-5h0Z" />
          <path d="M39.168,46.835c.277,4.398,.136,8.87-.526,13.203-.282,1.845,1.072,3.587,3.075,3.075,6.119-1.564,12.022-3.998,17.47-7.192,1.48-.868,1.775-3.534,0-4.317-5.664-2.498-11.329-4.997-16.993-7.495-1.234-.544-2.685-.361-3.42,.897-.622,1.063-.345,2.873,.897,3.42,5.664,2.498,11.329,4.997,16.993,7.495v-4.317c-5.141,3.013-10.496,5.21-16.276,6.687l3.075,3.075c.736-4.819,1.011-9.665,.704-14.532-.085-1.348-1.088-2.5-2.5-2.5-1.288,0-2.585,1.145-2.5,2.5h0Z" />
        </svg>
      </button>
    </div>
  )
}

export default CursorTools
