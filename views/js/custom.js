async function sweetAlert(type, title, content) {
  // 아이콘 별 분기 처리 (1=일반/2=성공/3=경고/4=실패/5=의문)
  if (type === INFO) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "info",
    });
    return result.isConfirmed;
  } else if (type === SUCCESS) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "success",
    });
    return result.isConfirmed;
  } else if (type === WARNING) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "warning",
    });
    return result.isConfirmed;
  } else if (type === ERROR) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "error",
    });
    return result.isConfirmed;
  } else if (type === QUESTION) {
    const result = await Swal.fire({
      title: title,
      text: content,
      icon: "question",
    });
    return result.isConfirmed;
  }
}
