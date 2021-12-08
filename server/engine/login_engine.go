package engine

import (
	"fmt"
	"mj/pb"
	"time"

	"github.com/iegad/xq/ex"
	"github.com/iegad/xq/nw/server"
	"google.golang.org/protobuf/proto"
)

type UserData struct {
	UserID     string
	Score      float64
	Idempotent int64
}

type LoginEngine struct {
}

func (this_ *LoginEngine) UserLogin(c server.IConn, in *pb.Package) (*pb.Package, error) {
	if c.RecvSeq() != 1 {
		return nil, fmt.Errorf("client: %v is invalid", c.RemoteAddr())
	}

	userData := c.GetUserData().(*UserData)
	if userData.Idempotent >= in.Idempotent {
		return nil, fmt.Errorf("client: %v idempontent is invalid", c.RemoteAddr())
	}

	req := &pb.UserLoginReq{}
	err := proto.Unmarshal(in.Data, req)
	if err != nil {
		return nil, err
	}

	if len(req.UserID) != 36 {
		return nil, fmt.Errorf("client: %v userID is invalid", c.RemoteAddr())
	}

	userData.UserID = req.UserID
	userData.Score = 10000.00

	return &pb.Package{
		PID:        pb.PackageID_PID_USER_LOGIN_RSP,
		Idempotent: time.Now().UnixMilli(),
		Data: ex.Pb2Bytes(&pb.UserLoginRsp{
			UserInfo: &pb.UserInfo{
				UserID: userData.UserID,
				Score:  userData.Score,
			},
		}),
	}, nil
}
