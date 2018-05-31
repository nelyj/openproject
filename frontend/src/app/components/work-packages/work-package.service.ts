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

import {States} from "../states.service";
import {WorkPackageTableRefreshService} from '../wp-table/wp-table-refresh-request.service';
import {StateService} from '@uirouter/core';

angular
    .module('openproject.services')
    .factory('WorkPackageService', WorkPackageService);

function WorkPackageService($http:ng.IHttpService,
                            $window:ng.IWindowService,
                            $state:StateService,
                            states:States,
                            PathHelper:any,
                            UrlParamsHelper:any,
                            NotificationsService:any,
                            wpTableRefresh:WorkPackageTableRefreshService) {

  var WorkPackageService = {

    performBulkDelete: function (ids:any, defaultHandling:any) {
      var params = {
        'ids[]': ids
      };
      var promise = $http['delete'](PathHelper.workPackagesBulkDeletePath(), {params: params});

      if (defaultHandling) {
        promise
            .then(function () {
              // TODO wire up to API and process API response
              NotificationsService.addSuccess(
                  I18n.t('js.work_packages.message_successful_bulk_delete')
              );
              wpTableRefresh.request('Bulk delete removed elements', true);

              if ($state.includes('**.list.details.**')
                  && ids.indexOf(+$state.params.workPackageId) > -1) {
                $state.go('work-packages.list', $state.params);
              }
            })
            .catch(function () {
              // FIXME catch this kind of failover in angular instead of redirecting
              // to a rails-based legacy view
              params = UrlParamsHelper.buildQueryString(params);
              window.location.href = PathHelper.workPackagesBulkDeletePath() + '?' + params;
            });
      }

      return promise;
    },
  };

  return WorkPackageService;
}
