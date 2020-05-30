'use babel';

import { CompositeDisposable } from 'event-kit';
const dayjs = require("dayjs")
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat);

const NAMESPACE = "inkdrop-display-date-format";
const subscriptions = new CompositeDisposable();
const ObserverEditorHeaderLayout = () => {
  // Update time when Editor Header is updated
  requestAnimationFrame(() => {
    const dateFormat = inkdrop.config.get(`${NAMESPACE}.editorHeaderdateFormat`);
    const dateElements = document.querySelectorAll(".label-datetime");
    console.log("dateElements", dateElements);
    dateElements.forEach(element => {
      // e.g. May 27th, 2020
      const parsedDayjs = dayjs(element.textContent, "MMM Do, YYYY", "en");
      console.log("parsedDayjs", parsedDayjs);
      // Probably already updated
      if (!parsedDayjs.isValid()) {
        return;
      }
      const formattedDate = parsedDayjs.format(dateFormat);
      element.textContent = formattedDate;
    });
  })
  return null;
}
module.exports = {
  config: {
    editorHeaderdateFormat: {
      title: 'Editor Header Date format',
      description:
        "Date format - See https://day.js.org/docs/en/parse/string-format#list-of-all-available-parsing-tokens",
      type: 'string',
      default: 'YYYY-MM-DD',
    }
  },
  activate() {
    inkdrop.components.registerClass(ObserverEditorHeaderLayout);
    inkdrop.layouts.addComponentToLayout(
      'editor-header',
      'ObserverEditorHeaderLayout'
    );
  },

  deactivate() {
    inkdrop.layouts.ObserverEditorHeaderLayout(
      'editor-header',
      'ObserverEditorHeaderLayout'
    )
    inkdrop.components.deleteClass(ObserverEditorHeaderLayout)

  }
};
