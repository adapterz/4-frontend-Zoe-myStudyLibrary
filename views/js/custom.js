async function sweetAlert(type, title, content, message) {
  // 아이콘 별 분기 처리 (1=일반/2=성공/3=경고/4=실패/5=의문/6=유저 요청 성공)
  if (type === INFO) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "info",
      confirmButtonColor: "#ffa07a",
    });
    return result.isConfirmed;
  } else if (type === SUCCESS) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "success",
      confirmButtonColor: "#ffa07a",
    });
    return result.isConfirmed;
  } else if (type === WARNING) {
    if (message) {
      const result = await Swal.fire({
        title: title,
        text: content,
        icon: "warning",
        confirmButtonColor: "#ffa07a",
        footer: message,
      });
      return result.isConfirmed;
    } else {
      const result = await Swal.fire({
        title: title,
        text: content,
        icon: "warning",
        confirmButtonColor: "#ffa07a",
      });
      return result.isConfirmed;
    }
  } else if (type === ERROR) {
    if (message) {
      const result = await Swal.fire({
        title: title,
        text: content,
        icon: "error",
        confirmButtonColor: "#ffa07a",
        footer: message,
      });
      return result.isConfirmed;
    } else {
      const result = await Swal.fire({
        title: title,
        text: content,
        icon: "error",
        confirmButtonColor: "#ffa07a",
      });
    return result.isConfirmed;
    }
  } else if (type === QUESTION) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "question",
      confirmButtonColor: "#ffa07a",
    });
    return result.isConfirmed;
  }
  else if(type === CHECK){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
console.log("hi");
    Toast.fire({
      icon: content,
      title: title
    });
  }
}
