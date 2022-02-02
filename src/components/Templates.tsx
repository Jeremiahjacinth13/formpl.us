import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paginator, Loader } from '.'
import { TemplateInterface } from '../constants'
import { RootState } from '../store'
import { getTemplatesFromAPI } from '../store/slices/templateSlice'
import './styles/templates.css'

export const Templates: React.FC = () => {

  const { templates, loading } = useSelector((state: RootState) => state.templates)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemplatesFromAPI())
  })

  return (
    <Fragment>
      {loading ? (
        <div
          style={{
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="templates__container">
          {templates.map((template, index) => (
            <Template key={index} {...{ template }} />
          ))}
        </div>
      )}
      {templates.length > 0 && <Paginator />}
    </Fragment>
  )
}

const Template: React.FC<{ template: TemplateInterface }> = ({ template }) => {
  return (
    <div className="template">
      <div className="template__details__container">
        <h3 className="template__name">{template.name}</h3>
        <p className="template__desc">{template.description}</p>
      </div>
      <button className="buttonreset template__action">Use Template</button>
    </div>
  )
}
