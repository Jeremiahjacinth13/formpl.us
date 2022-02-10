/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paginator, Loader } from '.'
import { paginatorSelector } from '../store/slices/paginatorSlice'

import {
  NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE,
  TemplateInterface,
} from '../constants'

import {
  getTemplatesFromAPI,
  templatesSelector,
} from '../store/slices/templateSlice'

import './styles/templates.css'

export const Templates: React.FC = () => {
  const {
    templates,
    loading,
    failed,
    errorMessage,
    activeCategoryFilter,
  } = useSelector(templatesSelector)

  const { currentPageIndex } = useSelector(paginatorSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTemplatesFromAPI())
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
        <>
          <div className="container templates__container">
            <h3 className="templates__categoryTitle">{activeCategoryFilter} Templates</h3>
            <div className="templates__grid">
              {templates
                .slice(
                  (currentPageIndex - 1) * NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE,
                  NUMBER_OF_TEMPLATES_SHOWN_PER_PAGE * currentPageIndex,
                )
                .map((template, index) => (
                  <Template key={index} {...{ template }} />
                ))}
              {templates.length === 0 && (
                <div className="nosearchresults">
                  <img
                    src="https://cdn.dribbble.com/users/734476/screenshots/4020070/artboard_15.png"
                    alt="no results found"
                  />
                  <h1>No Search Results....</h1>
                </div>
              )}
            </div>
          </div>
        </>
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
