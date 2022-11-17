import { useEffect, useRef, useState } from 'react'
import { colorThemeSelector } from '../../jotai-hooks/colorTheme/selector'
import usePreventPinch from '../../hooks/usePreventPinch'

type PageInfoState = 'DEFAULT' | 'LINKS' | 'COMMENTS'

type Props = {
  workingModuleIndex: number
  pageinfoIsVisible: boolean
  pageinfoWidth: number
}

const Pageinfo = ({ workingModuleIndex, pageinfoIsVisible, pageinfoWidth }: Props) => {
  const [pageinfoState, setPageInfoState] = useState<PageInfoState>('DEFAULT')
  const colorTheme = colorThemeSelector.useColorTheme()

  /*
   * Prevent pinch zooming.
   * */
  const pageinfoRef = useRef<HTMLDivElement>(null)
  usePreventPinch(pageinfoRef)

  useEffect(() => {
    if (pageinfoIsVisible) {
      document.getElementsByClassName('pageinfo')[0].classList.remove('display-none')
    } else {
      document.getElementsByClassName('pageinfo')[0].classList.add('display-none')
    }
  }, [pageinfoIsVisible])

  return (
    <div
      className="pageinfo display-none"
      ref={pageinfoRef}
      style={{
        backgroundColor: colorTheme.pageinfoBackground,
        width: `${pageinfoWidth}px`,
        boxShadow: `-1px 0 10px ${colorTheme.boxShadow}`,
      }}
    >
      <div className="pageinfo-section" style={{ color: colorTheme.text }}>
        Page Info
      </div>
      <div className="pageinfo-item">
        <div className="pageinfo-item-icon-container">
          <svg
            id="_レイヤー_1"
            className="pageinfo-item-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill={colorTheme.icon}
          >
            <path d="M87.088,5.861c-4.589-2.463-10.128-3.104-15.093-1.396-4.253,1.463-7.773,4.296-10.846,7.513-3.126,3.272-5.915,6.838-9.12,10.038-3.589,3.583-6.95,7.309-7.961,12.451-1.133,5.762,.103,11.608,1.451,17.221,.752,3.127,5.574,1.803,4.821-1.329-1.037-4.316-2.04-8.721-1.649-13.19,.382-4.377,2.839-7.566,5.829-10.575,2.882-2.901,5.546-5.948,8.259-9.004,2.535-2.855,5.226-5.678,8.643-7.473,4.109-2.159,9.052-2.133,13.141,.061,2.835,1.522,5.363-2.793,2.524-4.317h0Z" />
            <path d="M83.955,9.695c2.627,2.026,5.06,4.665,5.906,7.948,.411,1.595,.429,3.321-.186,4.869-.625,1.573-1.805,2.872-2.921,4.113-2.854,3.176-5.758,6.308-8.695,9.407-1.444,1.524-2.898,3.039-4.361,4.546-1.282,1.32-2.523,2.899-4.009,3.993-1.579,1.163-4.243,.668-6.08,.673-2.473,.006-4.946,.012-7.419,.018-3.217,.008-3.223,5.008,0,5,2.473-.006,4.946-.012,7.419-.018,2.258-.006,4.798,.269,6.956-.527,2.251-.83,3.851-2.718,5.484-4.389,1.694-1.732,3.375-3.477,5.044-5.233,3.302-3.474,6.6-6.967,9.762-10.57,1.509-1.719,2.851-3.518,3.64-5.684,.801-2.196,.792-4.642,.331-6.91-.995-4.892-4.532-8.61-8.349-11.554-1.07-.825-2.8-.163-3.42,.897-.755,1.291-.176,2.593,.897,3.42h0Z" />
            <path d="M40.42,46.797c-9.718-4.101-16.928,6.319-22.59,12.494-3.23,3.524-6.638,6.95-9.5,10.789-2.519,3.379-4.458,7.484-4.256,11.793,.196,4.198,2.173,8.319,5.478,10.95,3.506,2.791,8.064,3.798,12.445,2.898,4.576-.94,8.158-4.406,11.515-7.425,3.478-3.128,6.795-6.434,9.936-9.9,1.722-1.901,3.39-3.851,5.003-5.846,1.598-1.977,3.224-3.958,4.221-6.319,1.01-2.393,1.091-4.871,.379-7.362-.534-1.866-1.879-4.083-1.586-6.078,.196-1.334-.331-2.687-1.746-3.075-1.177-.323-2.878,.402-3.075,1.746-.295,2.009-.051,3.858,.588,5.781,.506,1.525,1.288,3.112,1.328,4.741,.084,3.457-3.312,6.68-5.371,9.126-5.204,6.182-10.962,12.208-17.337,17.2-2.764,2.164-5.998,3.344-9.497,2.452-3.131-.798-5.688-3.123-6.729-6.199-2.445-7.224,3.981-13.269,8.394-18.083,3.37-3.676,6.678-7.421,10.126-11.023,2.276-2.377,6.098-5.882,9.752-4.34,1.243,.525,2.677,.374,3.42-.897,.613-1.047,.354-2.893-.897-3.42h0Z" />
          </svg>
        </div>
        <div className="pageinfo-item-text" style={{ color: colorTheme.text }}>
          <s>links</s>
        </div>
      </div>
      <div className="pageinfo-item">
        <div className="pageinfo-item-icon-container">
          <svg
            id="_レイヤー_1"
            className="pageinfo-item-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            fill={colorTheme.icon}
          >
            <path d="M10.687,18.996c-2.078,.035-3.901,1.218-4.858,3.063-1.002,1.932-.893,4.143-.863,6.254,.063,4.456,.173,8.911,.331,13.365,.316,8.94,.715,17.912,1.522,26.823,.182,2.006,.558,4.09,2.054,5.571,1.401,1.388,3.252,1.913,5.156,2.14,4.168,.495,8.548,.136,12.725-.113,8.735-.522,17.451-1.607,26.215-1.459,2.398,.04,4.796,.174,7.18,.437,.678,.075,1.604,.022,2.069,.554,.582,.667,.921,1.711,1.369,2.473,2.259,3.839,5.201,7.287,8.629,10.128,1.262,1.046,3.001,.947,3.926-.506,1.387-2.178,2.464-4.584,3.119-7.084,.275-1.048,.345-2.162,.657-3.195,.194-.642,.395-.699,.989-.776,2.27-.297,4.48,.759,6.809,.322,2.454-.46,4.131-2.311,4.926-4.59,.757-2.17,.718-4.635,.881-6.902,.201-2.799,.404-5.597,.6-8.397,.396-5.655,.751-11.316,.88-16.985,.126-5.574,.033-11.16-.462-16.715-.232-2.601-.576-5.175-3.05-6.619-2.023-1.18-4.455-1.057-6.708-.984-11.457,.37-22.914,.741-34.371,1.111-12.868,.416-25.737,.832-38.605,1.248-3.209,.104-3.224,5.104,0,5,21.835-.706,43.67-1.411,65.505-2.117,2.74-.089,5.479-.18,8.219-.266,1.132-.035,3.495-.443,3.821,1.02,.533,2.388,.468,5.06,.571,7.499,.111,2.622,.146,5.246,.126,7.87-.042,5.422-.321,10.839-.674,16.249-.339,5.192-.579,10.422-1.109,15.598-.17,1.657-.474,3.185-2.382,3.135-2.411-.063-4.676-.946-7.07-.092-2.716,.968-3.535,3.166-4.038,5.785-.51,2.654-1.499,5.086-2.949,7.363l3.926-.506c-2.73-2.262-5.142-4.87-7.067-7.852-.974-1.51-1.667-3.277-2.836-4.645-1.295-1.517-3.11-1.811-4.983-2.039-8.132-.99-16.343-.419-24.478,.225-4.092,.324-8.183,.669-12.284,.853-2.086,.093-4.174,.145-6.262,.131-1.512-.011-3.306,.159-4.749-.411-1.175-.464-1.214-1.714-1.305-2.834-.174-2.138-.321-4.28-.465-6.42-.282-4.199-.523-8.401-.721-12.606-.222-4.699-.391-9.4-.507-14.102-.057-2.31-.102-4.62-.134-6.931-.008-.56-.376-4.05,.725-4.069,3.214-.055,3.224-5.055,0-5h0Z" />
            <path d="M30.309,38.519c12.813,.52,25.639,.938,38.375-.892,1.338-.192,2.072-1.891,1.746-3.075-.395-1.437-1.733-1.939-3.075-1.746-12.257,1.761-24.719,1.214-37.046,.713-3.218-.131-3.212,4.87,0,5h0Z" />
            <path d="M32.133,48.775c12.02-.456,24.051-.507,36.074-.154,3.219,.095,3.216-4.906,0-5-12.023-.353-24.054-.302-36.074,.154-3.207,.122-3.223,5.122,0,5h0Z" />
            <path d="M31.454,58.989c13.164-.102,26.328-.205,39.491-.307,3.216-.025,3.223-5.025,0-5-13.164,.102-26.328,.205-39.491,.307-3.216,.025-3.223,5.025,0,5h0Z" />
          </svg>
        </div>
        <div className="pageinfo-item-text" style={{ color: colorTheme.text }}>
          <s>comments</s>
        </div>
      </div>
    </div>
  )
}

export default Pageinfo
