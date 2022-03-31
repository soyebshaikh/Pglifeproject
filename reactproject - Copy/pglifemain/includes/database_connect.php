<?php
  $host        = "host = 127.0.0.1";
  $port        = "port = 5432";
  $dbname      = "dbname = PGlife";
  $credentials = "user = postgres password=Soyeb@2001";

  $db = pg_connect( "$host $port $dbname $credentials"  );


?>