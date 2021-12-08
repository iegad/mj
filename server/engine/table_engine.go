package engine

type TableEngine struct {
}

// func (this_ *TableEngine) CreateTable(c server.IConn, in *pb.Package) (*pb.Package, error) {
// 	userData := c.GetUserData().(*UserData)
// 	if userData.Idempotent >= in.Idempotent {
// 		return nil, fmt.Errorf("client: %v idempotent is invalid", c.RemoteAddr())
// 	}

// 	req := &pb.CreateTableReq{}
// 	err := proto.Unmarshal(in.Data, req)
// 	if err != nil {
// 		return nil, err
// 	}

// 	if req.MaxFan <0
// }
