import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paginator, Loader } from '.'
import {
  NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE,
  TemplateInterface,
} from '../constants'
import { paginatorSelector } from '../store/slices/paginatorSlice'
import {
  getTemplatesFromAPI,
  templatesSelector,
} from '../store/slices/templateSlice'
import './styles/templates.css'

export const Templates: React.FC = () => {
  const { templates, loading, failed, errorMessage } = useSelector(
    templatesSelector,
  )
  const { currentPageIndex } = useSelector(paginatorSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(getTemplatesFromAPI(null))
  }, [])

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
      ) : failed ? (
        <h1>{errorMessage}</h1>
      ) : (
        <div className="templates__container container">
          {templates
            .slice(
              (currentPageIndex - 1) * NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE,
              NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE * currentPageIndex,
            )
            .map((template, index) => (
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
      <a href={template.link}>
        <button className="buttonreset template__action">Use Template</button>
      </a>
    </div>
  )
}
