class Status {
  constructor(adminStepData, academicStepData, handleRequest) {
      this.adminStepData = adminStepData;
      this.academicStepData = academicStepData;
      this.handleRequest = handleRequest;
      this.userData = null;
      this.error = null;
      this.requestStatus = [];
      this.steps = null;
      this.router = useRouter();
  }

  fetchData = async () => {
      const response = await fetch("/api/userStatus");
      const data = await response.json();
      const updatedData = data.map((user) => ({
          ...user,
          id: user._id,
          roleId: user._id,
      }));
      this.userData = updatedData;
      this.handleError();
      this.processData();
  };

  handleError = () => {
      if (!this.userData && !this.error) {
          console.log("Loading...");
      }
      if (this.error) {
          console.error("Error fetching data:", this.error);
          console.log("Failed to fetch data");
      }
  };

  processData = () => {
      if (this.userData && this.userData.length > 0) {
          if (this.userData[0]?.staffType === "ACADEMIC") {
              let academicStep = {};
              this.academicStepData.forEach((data) => {
                  academicStep[data.name] = data.nextSteps;
              });
              this.steps = academicStep;
          } else if (this.userData[0]?.staffType === "ADMIN") {
              let adminStep = {};
              this.adminStepData.forEach((data) => {
                  adminStep[data.name] = data.nextSteps;
              });
              this.steps = { ...adminStep };
              delete this.steps.Director;
          }

          const currentStatus = this.userData[0]?.status;
          Object.keys(this.steps).forEach((key) => {
              const stepKey = key;
              const approvals = this.userData[0]?.approvals.map(
                  (approval) => approval.role
              );
              const rejections = this.userData[0]?.rejections;
              let status = "Not Started Employee";

              if (approvals && approvals.includes(key)) {
                  status = "Approved Employee";
              } else if (rejections && rejections.includes(key)) {
                  status = "Rejected Employee";
              } else if (currentStatus && currentStatus.includes(key)) {
                  for (const element of currentStatus) {
                      if (
                          this.steps[element] &&
                          (this.steps[element].includes(stepKey) ||
                              (this.steps[this.steps[element][0]] &&
                                  this.steps[this.steps[element][0]].includes(
                                      stepKey
                                  )))
                      ) {
                          status = "Not Started";
                          break;
                      }
                      status = "Pending";
                  }
              }
              this.requestStatus.push({ name: key, status: status });
          });
          this.setRequestStatus(this.requestStatus);
      }
  };

  handleReinitate = async (key) => {
      const response = await fetch(`/api/reinitiateRejected`, {
          method: "PATCH",
          body: JSON.stringify({
              reinitiate: this.requestStatus[key].name,
              objectId: this.userData[0]._id,
          }),
      });
      if (response.ok) {
          toast.success("Your clearance is reinitiated successfully");
      }
  };

  handlePrintClearance = () => {
      this.router.push(
          `/user/PrintClearance?clearanceId=${this.userData[0]?._id}`
      );
  };
}
