function TextPresentationVert(props: { Header: React.ReactNode, Text: React.ReactNode,Foot?: React.ReactNode }) {
  return (
      <div className="grid
      items-stretch
      pt-20
      gap-4
      pb-28
      md:grid-cols-2
      grid-cols-1
      space-y-2
      ">
          <h2 className="
          text-green-800
          font-garamond-bold
          text-3xl
          md:text:4xl
          lg:text-5xl
          pl-8
          ml-3
          md:pl-28
          ">{props.Header}</h2>
          <div className="
          space-y-20
          pl-24
          md:pl-4
          ">
              <div className="
          font-extralight
            text-gray-900
            text-lg
            md:text-xl
            text-wrap
            pr-8
            md:pr-18
          ">{props.Text}
              </div>
              {
                    props.Foot && <div className="flex items-center font-bold gap-1 text-green-800 hover:text-gray-950">
                        {props.Foot}
                    </div>
              }
          </div>
      </div>
  );
}

export default TextPresentationVert;