<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Acess-Control-Allow_Methods: GET, POST, PUT, DELETE, OPTIONS");

$host = "localhost";
$user = "root";
$pass = "";
$db = "produtos";

$conn = new mysqli($host, $user, $pass, $db);

if($conn->connect_error){
    http_response_code(500);
    echo json_encode(["erro"=>"Falha na conexão: ".$conn-$connect_error]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method){
    case 'GET':
        if(isset($_GET['pesquisa'])){
            $pesquisa="%" .$_GET['pesquisa']."%";

            $stmt = $conn->prepare("SELECT * FROM produtos WHERE LOGIN LIKE ? OR NOME LIKE ?");
            $stmt->bind_param("ss",$pesquisa, $pesquisa);
            $stmt->execute();
            $result=$stmt->get_result();
        }
        else{
            $result=$conn->query("SELECT * FROM produtos order by ID desc");
        }
            $retorno = [];
        while($linha= $result->fetch_assoc()){
            $retorno[]=$linha;
        }
        echo json_encode($retorno);
        break;
        case 'POST':
            $data=json_decode(file_get_contents("php://input"),true);
            $stmt=$conn->prepare("INSERT INTO produtos (NOME, DESCRICAO, PRECO, ESTOQUE, ACAO) VALUES (?, ?, ?, ?, ?)");
            //print_r($data);
            $stmt->bind_param("ssssi",$data['NOME'], $data['DESCRICAO'], $data['VALOR'], $data['ESTOQUE'], $data['ACAO']);
            $stmt->execute();
            echo json_encode(["status"=>"ok","insert_id"=>$stmt->insert_id]);
            break;

        case 'PUT':
            $data = json_decode(file_get_contents("php://input"), true);
            $stmt=$conn->prepare("UPDATE produtos SET NOME=?, DESCRICAO=?, PRECO=?, ESTOQUE=?, ATIVO=? WHERE ID=?");
            $stmt->bind_param("ssssi",$data['NOME'], $data['DESCRICAO'], $data['PRECO'], $data['ESTOQUE'], $data['ACAO'], $data['ID']);
            $stmt->execute();
            echo json_encode(["status"=>"ok"]);
            break;
        
        case 'DELETE':
            $id = $_GET['id'];
            $stmt=$conn->prepare("DELETE FROM produtos WHERE ID=?");
            $stmt->bind_param("i",$id);
            $stmt->execute();
            echo json_encode(["status"=>"ok"]);
            break;
}

$conn->close();