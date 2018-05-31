import {Inject, Injectable, Injector} from '@angular/core';
import {I18nService} from 'core-app/modules/common/i18n/i18n.service';
import {WpTableConfigurationDisplaySettingsTab} from 'core-components/wp-table/configuration-modal/tabs/display-settings-tab.component';
import {WpTableConfigurationColumnsTab} from 'core-components/wp-table/configuration-modal/tabs/columns-tab.component';
import {WpTableConfigurationSortByTab} from 'core-components/wp-table/configuration-modal/tabs/sort-by-tab.component';
import {WpTableConfigurationTimelinesTab} from 'core-components/wp-table/configuration-modal/tabs/timelines-tab.component';
import {WpTableConfigurationFiltersTab} from 'core-components/wp-table/configuration-modal/tabs/filters-tab.component';
import {WpTableConfigurationService} from 'core-components/wp-table/configuration-modal/wp-table-configuration.service';
import {QueryConfigurationLocals} from 'core-components/wp-table/external-configuration/external-query-configuration.component';
import {OpQueryConfigurationLocalsToken} from 'core-components/wp-table/external-configuration/external-query-configuration.service';

@Injectable()
export class RestrictedWpTableConfigurationService extends WpTableConfigurationService {

  constructor(@Inject(OpQueryConfigurationLocalsToken) readonly locals:QueryConfigurationLocals,
              readonly I18n:I18nService) {
    super(I18n);
  }

  public get tabs() {
    const disabledTabs = this.locals.disabledTabs || {};

    return this
      ._tabs
      .map(el => {
        const reason = disabledTabs[el.name];
        if (reason != null) {
          el.disableBecause = reason;
        }

        return el;
      });
  }
}
