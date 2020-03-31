axios({
        url: 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=7d8f9b1af7d8adb32c3afea5fa71debf682fbd3b',
        method: 'POST',
        data: formData
    }).then((res)=> {
        console.log('deu bom ====================')
        console.log(res.data)
        res.json(res.data)
    }, (err)=> {
        console.log('deu erro ====================')
        console.log(err)
    })


    formData.append('file', file, {
            filename: 'answer'
    })
    
    const headers = {
        'content-type': `multipart/form-data; boundary=${formData._boundary}`
    }

    const r = await api.post(`/submit-solution?token=${process.env.API_TOKEN}`, headers, FormData)

      const r = request.post(
        { url: 'https://api.codenation.dev/v1/challenge/dev-ps/submit-solution?token=7d8f9b1af7d8adb32c3afea5fa71debf682fbd3b', headers },
        function optionalCallback (err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err)
          }
          console.log('Upload successful!  Server responded with:', body)
        }
      )
      const form = r.form()
      form.append('answer', file, {
        filename: 'answer.json'
      })