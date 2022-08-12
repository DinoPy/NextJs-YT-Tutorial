export default function handler(req, res) {
	res.setPreviewData({ user: 'me' });
	res.redirect(req.query.redirect);
}
