var cube : GameObject;

function Update () {
	cube.transform.Rotate(Vector3.up * Time.deltaTime * 50, Space.World);
	cube.transform.Rotate(Vector3.right * Time.deltaTime * 30, Space.World);
}