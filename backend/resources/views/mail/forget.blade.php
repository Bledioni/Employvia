<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <p>Change Your Password <a href="http://localhost:3000/reset/{{ $token }}" targe="_blank">Click Here</a></p>

    <br>
    <p>PinCode:{{ $token }}</p>
</body>
</html>