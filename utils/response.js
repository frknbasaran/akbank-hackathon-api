export default {
  "ok": (data) => {
    return {"success":true, "data":data}
  },
  "error": (error) => {
    if (typeof error === "object") {
        return {"success":false, "message": error.message};
    } else {
        return {"success":false, "message": error};
    }
  }
}