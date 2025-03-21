import { injectIntl } from "react-intl";
import { useGetStarted } from "./hooks";
import { InvisibleButton } from "buttons";
import {
  LogsLinkMsg,
  SettingsLinkMsg,
  UpdateAvailableLink,
  AboutModalButton
} from "./messages";
import { LoaderBarBottom } from "indicators";
import { classNames } from "pi-ui";
import styles from "./GetStarted.module.css";

const GetStarted = ({
  getCurrentBlockCount,
  getNeededBlocks,
  getEstimatedTimeLeft,
  appVersion
}) => {
  const {
    onShowLogs,
    onShowSettings,
    updateAvailable,
    isTestNet,
    PageComponent,
    showNavLinks
  } = useGetStarted();

  return (
    <div
      data-testid="getstarted-pagebody"
      className={classNames(
        styles.pageBody,
        styles.getstarted,
        isTestNet && styles.testnetBody
      )}>
      <div className={classNames(styles.getstarted, styles.loader)}>
        <div className={styles.loaderSettingsLogs}>
          {updateAvailable && (
            <UpdateAvailableLink updateAvailable={updateAvailable} />
          )}
          <AboutModalButton {...{ appVersion, updateAvailable }} />
          {showNavLinks && (
            <>
              <InvisibleButton onClick={onShowSettings}>
                <SettingsLinkMsg />
              </InvisibleButton>
              <InvisibleButton onClick={onShowLogs}>
                <LogsLinkMsg />
              </InvisibleButton>
            </>
          )}
        </div>
        {PageComponent &&
          (React.isValidElement(PageComponent) ? (
            PageComponent
          ) : (
            <PageComponent />
          ))}
        <LoaderBarBottom
          {...{ getCurrentBlockCount, getNeededBlocks, getEstimatedTimeLeft }}
        />
      </div>
    </div>
  );
};

export default injectIntl(GetStarted);
