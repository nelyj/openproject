//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2017 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2017 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

import {GlobalI18n} from "core-app/modules/common/i18n/i18n.service";

declare const I18n:GlobalI18n;

(function ($:JQueryStatic) {

  $(function () {
    // Specifies minimum versions to be supported
    // As we don't support ANY version of msie, so treat 11 (last ie before edge) as unsupported
    const minimumSupported = {
      msie: '12',
      firefox: '60'
    };
    let additionalMessage = I18n.t("js.unsupported_browser.update_message");

    if (bowser.isUnsupportedBrowser(minimumSupported, window.navigator.userAgent)) {
      if (bowser.msie) {
        additionalMessage = I18n.t("js.unsupported_browser.update_ie_user");
      }

      $().topShelf({
        id: 'op.unsupported_browsers',
        title: I18n.t("js.unsupported_browser.title"),
        message: I18n.t("js.unsupported_browser.message") + '<br/>' + additionalMessage,
        link: I18n.t("js.unsupported_browser.learn_more"),
        close: I18n.t("js.unsupported_browser.close_warning"),
        url: "https://www.openproject.org/open-source/download/systemrequirements/"
      });
    }
  });

}(jQuery));
