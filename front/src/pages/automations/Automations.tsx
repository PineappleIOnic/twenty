import { AutomationsRecoilScopeContext } from '@/activities/states/recoil-scope-contexts/AutomationsRecoilScopeContext';
import { PageAddAutomationButton } from '@/automations/components/PageAddAutomationButton';
import { IconFunction } from '@/ui/display/icon/index';
import { PageBody } from '@/ui/layout/page/PageBody';
import { PageContainer } from '@/ui/layout/page/PageContainer';
import { PageHeader } from '@/ui/layout/page/PageHeader';
import { ObjectFilterDropdownScope } from '@/ui/object/object-filter-dropdown/scopes/ObjectFilterDropdownScope';
import { RecoilScope } from '@/ui/utilities/recoil-scope/components/RecoilScope';

export const Automations = () => {
  return (
    <PageContainer>
      <RecoilScope CustomRecoilScopeContext={AutomationsRecoilScopeContext}>
        <ObjectFilterDropdownScope filterScopeId="tasks-filter-scope">
          <PageHeader title="Automations" Icon={IconFunction}>
            <PageAddAutomationButton />
          </PageHeader>
          <PageBody>
            <h1>test</h1>
          </PageBody>
        </ObjectFilterDropdownScope>
      </RecoilScope>
    </PageContainer>
  );
};
