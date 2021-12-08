package main

import (
	"fmt"
	"mj/engine"
	"mj/pb"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/iegad/xq/ex"
	"github.com/iegad/xq/log"
	"github.com/iegad/xq/nw"
	"github.com/iegad/xq/nw/server"
	"google.golang.org/protobuf/proto"
)

type MaJiang struct {
	engine.LoginEngine
}

func (this_ *MaJiang) OnConnected(c server.IConn) error {
	log.Debug("connected event: %v has connected", c.RemoteAddr().String())
	c.SetUserData(&engine.UserData{})
	return nil
}

func (this_ *MaJiang) OnDisconnect(c server.IConn) {
	log.Debug("disconnected event: %v: %v has disconnected", c.RemoteAddr(), c.GetUserData())
}

func (this_ *MaJiang) OnPrevRun(svr server.IServer) error {
	log.Debug("prevRun event: %s ready to run", svr.Host())
	return nil
}

func (this_ *MaJiang) OnPostRun(svr server.IServer) {
}

func (this_ *MaJiang) OnPrevStop(svr server.IServer) {
	log.Debug("prevStop event: %s ready to stop", svr.Host())
}

func (this_ *MaJiang) OnPostStop(svr server.IServer) {
	log.Debug("postStop event: %s has stopped", svr.Host())
}

func (this_ *MaJiang) OnError(et server.ErrorType, obj interface{}, err error) {
	log.Debug("error event: %v: %v => %v", et, obj, err)
}

func (this_ *MaJiang) Encode(c server.IConn, data []byte) ([]byte, error) {
	log.Debug("encode event: %s", c.RemoteAddr().String())
	return data, nil
}

func (this_ *MaJiang) Decode(c server.IConn, data []byte) ([]byte, error) {
	log.Debug("decode event: %s", c.RemoteAddr().String())
	return data, nil
}

func main() {
	log.Init()

	proc := &MaJiang{}
	server, err := ex.NewServer(nw.PROTOCOL_WS, proc, &server.Option{
		MaxConn: 10,
		Timeout: 30,
		Host:    ":10010",
	})

	server.SetConnectedEvent(proc.OnConnected)
	server.SetDisconnectedEvent(proc.OnDisconnect)
	server.SetPrevRunEvent(proc.OnPrevRun)
	server.SetPrevStopEvent(proc.OnPrevStop)
	server.SetPostStopEvent(proc.OnPostStop)
	server.SetErrorEvent(proc.OnError)

	if err != nil {
		log.Fatal(err)
	}

	done := make(chan os.Signal, 1)
	signal.Notify(done, syscall.SIGINT)

	wg := &sync.WaitGroup{}
	wg.Add(1)
	go func() {
		defer wg.Done()
		<-done
		server.Stop()
	}()

	server.Run()
	wg.Wait()
	log.Release()
}

func (this_ *MaJiang) OnProcess(c server.IConn, data []byte) error {
	var (
		err error
		in  = &pb.Package{}
	)

	err = proto.Unmarshal(data, in)
	if err != nil {
		log.Error(err)
		return err
	}

	log.Debug(ex.Pb2Json(in))

	var (
		out *pb.Package
	)

	switch in.PID {
	case pb.PackageID_PID_USER_LOGIN_REQ:
		out, err = this_.UserLogin(c, in)

	default:
		err = fmt.Errorf("invalid PID: %v", in.PID)
		log.Error(err)
	}

	if err == nil && out != nil {
		log.Debug(ex.Pb2Json(out))
		err = c.Write(ex.Pb2Bytes(out))
		if err != nil {
			log.Error(err)
		}
	}

	c.GetUserData().(*engine.UserData).Idempotent = in.Idempotent
	return err
}
